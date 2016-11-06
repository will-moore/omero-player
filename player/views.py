
from omeroweb.webclient.decorators import login_required
from omeroweb.webgateway.views import _get_prepared_image
from django.http import Http404, HttpResponse
from cStringIO import StringIO

@login_required()
def render_image(request, imageId, z, t, conn=None, **kwargs):

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
