#!/usr/bin/env python3

import sys
import gi

gi.require_version('Gtk', '3.0')

from gi.repository import Gtk

def icon(class_name, title):
    theme = Gtk.IconTheme.get_default()
    icon_w_class_u = theme.lookup_icon(class_name.capitalize(), 24, 0)
    icon_w_class_l = theme.lookup_icon(class_name.lower(), 24, 0)
    icon_w_title_u = theme.lookup_icon(title.capitalize(), 24, 0)
    icon_w_title_l = theme.lookup_icon(title.lower(), 24, 0)

    if icon_w_class_u is not None:
        return icon_w_class_u.get_filename()
    elif icon_w_class_l is not None:
        return icon_w_class_l.get_filename()
    elif icon_w_title_u is not None:
        return icon_w_title_u.get_filename()
    elif icon_w_title_l is not None:
        return icon_w_title_l.get_filename()
    else:
        return None
        

if __name__ == "__main__":
    class_name = sys.argv[1]
    title = sys.argv[2]

    icon_path = icon(class_name, title)

    if icon_path is not None:
        print(icon_path)
    else:
        print("")