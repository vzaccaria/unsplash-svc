Usage:
    unsplash-svc prepare
    unsplash-svc install [-d DIR] [-t TIME]
    unsplash-svc ( start | restart | stop | remove | info )
    unsplash-svc ( -h | --help )

Options:
    -h, --help              help for unsplash-svc
    -d, --directory DIR     destination directory for images [default: ~/Pictures/Unsplash]
    -t, --time TIME         minutes between image change

Commands:
    prepare                 prepare system for running the service (do this FIRST!)
    install                 install the service
    start                   start the service
    restart                 restart the service
    stop                    stop the service
    remove                  remove the service
    info                    information about the service

Arguments:
