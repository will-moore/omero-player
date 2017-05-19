
OMERO-player
============

A web-based image viewer for OMERO, designed to
cache image planes in the browser to allow for
rapid scrolling through Z or Time dimensions.

NB: This is a personal prototype app and is not supported by the OME team.


.. image:: https://cloud.githubusercontent.com/assets/900055/22201036/c9aa5f72-e159-11e6-88db-23697b196fa4.png


Installation
============

Requires OMERO.web framework.

Installation via pip::

	$ pip install -U git+git://github.com/will-moore/omero-player.git@master#egg=player


Add to the list of OMERO.web apps::

	$ bin/omero config append omero.web.apps '"omero_player"'

Optionally add to the 'Open with' menu options, to open images in OMERO.player from webclient::

	$ bin/omero config append '["omero_player", "player_index",
	  {"supported_objects": ["image"], "script_url": "player/openwith.js", "label": "OMERO.player"}]'


Development
===========

To install development version, clone the repository and add to
your $PYTHONPATH::

	$ export PYTHONPATH=/path/to/omero-player:$PYTHONPATH


OMERO.player uses React.js and Redux.js and is built with webpack::

    $ cd omero-player
    $ npm install


To generate omero_player/static/omero_player/bundle.min.js for Django app::

	$ npm run debug


To do the same build and watch for changes during development::

    $ npm run dev
