What is it
----------

Updates the Mac Desktop Wallpaper with images from Unsplash. It installs
an OSX daemon that can be started and stopped from the cli.

Before start everything, run:

    unsplash-svc prepare

and follow the instructions.

By default, it installs pictures in `~/Pictures/Unsplash`. Each picture
is deleted before downloading the next one.



### To start

Use option `-t, --time TIME` to specify the time bewteen updates.

``` {.bash}
sudo unsplash-svc install -t 10  # Updates every 10 minutes
```

note: `sudo` is required for the daemon to run.

### To stop

``` {.bash}
sudo unsplash-svc remove
```

### Check status

To check status, open `console.app` and check in

```
/Library/Logs/DiagnosticReports/Unsplash Updater
```
