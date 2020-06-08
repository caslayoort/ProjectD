//
//  Generated file. Do not edit.
//

#import "GeneratedPluginRegistrant.h"

#if __has_include(<add_2_calendar/SwiftAdd2CalendarPlugin.h>)
#import <add_2_calendar/SwiftAdd2CalendarPlugin.h>
#else
@import add_2_calendar;
#endif

#if __has_include(<device_calendar/DeviceCalendarPlugin.h>)
#import <device_calendar/DeviceCalendarPlugin.h>
#else
@import device_calendar;
#endif

#if __has_include(<google_maps_flutter/FLTGoogleMapsPlugin.h>)
#import <google_maps_flutter/FLTGoogleMapsPlugin.h>
#else
@import google_maps_flutter;
#endif

#if __has_include(<url_launcher/UrlLauncherPlugin.h>)
#import <url_launcher/UrlLauncherPlugin.h>
#else
@import url_launcher;
#endif

@implementation GeneratedPluginRegistrant

+ (void)registerWithRegistry:(NSObject<FlutterPluginRegistry>*)registry {
  [SwiftAdd2CalendarPlugin registerWithRegistrar:[registry registrarForPlugin:@"SwiftAdd2CalendarPlugin"]];
  [DeviceCalendarPlugin registerWithRegistrar:[registry registrarForPlugin:@"DeviceCalendarPlugin"]];
  [FLTGoogleMapsPlugin registerWithRegistrar:[registry registrarForPlugin:@"FLTGoogleMapsPlugin"]];
  [FLTUrlLauncherPlugin registerWithRegistrar:[registry registrarForPlugin:@"FLTUrlLauncherPlugin"]];
}

@end
