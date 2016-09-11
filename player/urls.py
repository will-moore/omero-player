
from django.conf.urls import url, patterns
from django.views.generic import TemplateView

# url patterns
urlpatterns = patterns(
    '',
    url(r'^$', TemplateView.as_view(template_name='player/index.html'),
        name="player_index"),

    url(r'^image/(?P<imageId>[a-z0-9]+)/$', TemplateView.as_view(template_name='player/index.html'),
        name="player_image"),
)
