What is it
----------

Updates the Mac Desktop Wallpaper with images from Unsplash. It installs
an OSX daemon that can be started and stopped from the cli.

By default, it installs pictures in `~/Pictures/Unsplash`. Each picture
is deleted before downloading the next one.

Instructions
------------

After you've invoked prepare, to start the service:

    > unsplash-svc prepare              # Follow the instructions
    > sudo unsplash-svc install -t 10   # Updates every 10 minutes
    > sudo unsplash-svc start

To stop, restart and remove the service, use the appropriate commands.

Information about the running daemon
------------------------------------

You can query information about the daemon with

    > sudo unsplash-svc info

You can also check the daemon's log in `console.app`; look for the entry: 

    /Library/Logs/DiagnosticReports/Unsplash Updater
