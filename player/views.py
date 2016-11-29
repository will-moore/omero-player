
from omeroweb.webclient.decorators import login_required
from omeroweb.webgateway.views import _get_prepared_image
from django.http import Http404, HttpResponse
from cStringIO import StringIO
from PIL import Image


@login_required()
def render_stitched_image(request, imageId, conn=None, **kwargs):

    pi = _get_prepared_image(request, imageId, conn=conn)
    if pi is None:
        raise Http404
    image, compress_quality = pi

    zStart = request.GET.get('z', None)
    tStart = request.GET.get('t', None)

    if zStart is None:
        raise Http404('specify ?z=0 or ?z=0-5')
    if tStart is None:
        raise Http404('specify ?t=0 or ?t=0-5')

    zz = zStart.split('-')
    zStart = int(zz[0])
    if len(zz) > 1:
        zEnd = int(zz[1])
    else:
        # only render single index
        zEnd = zStart + 1

    tt = tStart.split('-')
    print tt
    tStart = int(tt[0])
    if len(tt) > 1:
        tEnd = int(tt[1])
    else:
        # only render single index
        tEnd = tStart + 1

    planeCount = (zEnd - zStart) * (tEnd - tStart)
    sizeX = image.getSizeX()
    width = sizeX * planeCount
    height = image.getSizeY()
    matrix = Image.new('RGB', (width, height))
    pasteX = 0
    for z in range(zStart, zEnd):
        for t in range(tStart, tEnd):
            print 'z', z, 't', t
            plane = image.renderImage(z, t, compression=compress_quality)
            matrix.paste(plane, (pasteX, 0))
            pasteX += sizeX
    rv = StringIO()
    compression = 1.0
    matrix.save(rv, 'jpeg', quality=int(compression*100))
    jpeg_data = rv.getvalue()
    rsp = HttpResponse(jpeg_data, content_type='image/jpeg')
    return rsp


@login_required()
def render_image(request, imageId, z, t, conn=None, **kwargs):
    # Render 4-channel image as RGBA png with Alpha for 4th channel
    pi = _get_prepared_image(request, imageId, conn=conn)
    if pi is None:
        raise Http404
    image, compress_quality = pi
    image.setActiveChannels([1,2,3], colors=['FF0000', '00FF00', '0000FF'])
    img = image.renderImage(z, t, compression=compress_quality)

    if image.getSizeC() > 3:
        # render 4th channel 
        image.setActiveChannels([4], colors=['FF0000'])
        img4 = image.renderImage(z, t, compression=compress_quality)
        img = img.convert("RGBA")

        pixdata = img.load()
        pixdata4 = img4.load()
        for y in xrange(img.size[1]):
            for x in xrange(img.size[0]):
                p = pixdata[x, y]
                pixdata[x, y] = (p[0], p[1], p[2], pixdata4[x, y][0])

    # convert from PIL back to string image data
    rv = StringIO()
    compression = 1.0
    img.save(rv, 'png', quality=int(compression*100))
    png_data = rv.getvalue()

    rsp = HttpResponse(png_data, content_type='image/png')
    return rsp
