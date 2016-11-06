
from django.conf.urls import url, patterns
from django.views.generic import TemplateView
import views

# url patterns
urlpatterns = patterns(
    '',
    url(r'^$', TemplateView.as_view(template_name='player/index.html'),
        name="player_index"),

    url(r'^image/(?P<imageId>[0-9]+)/$', TemplateView.as_view(template_name='player/index.html'),
        name="player_image"),

    url(r'^render_image/(?P<imageId>[0-9]+)/(?P<z>[0-9]+)/(?P<t>[0-9]+)/$', views.render_image, name="player_render_image"),
)
