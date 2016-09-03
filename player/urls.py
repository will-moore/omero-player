
from django.conf.urls import url, patterns
from django.views.generic import TemplateView

from omeroweb.feedback import views

# url patterns
urlpatterns = patterns(
    '',
    url(r'^$', TemplateView.as_view(template_name='player/index.html'),
        name="player_index"),
)