
import os
from distutils.core import Command
import setuptools.command.install
import setuptools.command.sdist
from setuptools import setup, find_packages


VERSION = "0.0.1"
DESCRIPTION = "An image viewer for OMERO"
AUTHOR = "Will Moore"
LICENSE = "AGPL-3.0"
HOMEPAGE = "https://github.com/will-moore/omero-player"


# Utility function to read the README file.
# Used for the long_description.  It's nice, because now 1) we have a top level
# README file and 2) it's easier to type in the README file than to put a raw
# string in below ...
def read(fname):
    p = os.path.join(os.path.dirname(__file__), fname)
    with open(p) as f:
        data = f.read()
    return data


cmdclass = {}

class NpmInstall(Command):

    def initialize_options(self):
        pass

    def finalize_options(self):
        pass

    def run(self):
        self.spawn(['npm', 'install'])


cmdclass['npm_install'] = NpmInstall


class Webpack(Command):

    sub_commands = [
        ('npm_install', None)
    ]

    def initialize_options(self):
        pass

    def finalize_options(self):
        pass

    def run(self):
        if not os.path.isdir('src'):
            return
        for command in self.get_sub_commands():
            self.run_command(command)

        # npm script builds with webpack
        self.spawn(['npm', 'run', 'debug'])


cmdclass['webpack'] = Webpack


class Sdist(setuptools.command.sdist.sdist):

    def run(self):
        if os.path.isdir('src'):
            self.run_command('webpack')
        setuptools.command.sdist.sdist.run(self)


cmdclass['sdist'] = Sdist


class Install(setuptools.command.install.install):

    def run(self):
        if os.path.isdir('src'):
            self.run_command('webpack')
        setuptools.command.install.install.run(self)


cmdclass['install'] = Install


setup(name='omero-player',
      packages=find_packages(exclude=['ez_setup']),
      version=VERSION,
      description=DESCRIPTION,
      long_description=read('README.rst'),
      classifiers=[],
      url=HOMEPAGE,
      author_email='ome-devel@lists.openmicroscopy.org.uk',
      author=AUTHOR,
      include_package_data=True,
      download_url='https://github.com/will-moore/omero-player/tarball/%s' % VERSION,  # NOQA
      zip_safe=False,
      cmdclass=cmdclass,
      )
