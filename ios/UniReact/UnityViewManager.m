#import <React/RCTViewManager.h>
#import <UIKit/UIKit.h>
#import "UnityViewManager.h"

@implementation UnityViewManager

RCT_EXPORT_MODULE(UnityView)

- (UIView *)view
{
    // NSLog(@"Hello, UnityViewManager!");
    UnityView *view = [UnityView new];
    UIWindow * main = [[[UIApplication sharedApplication] delegate] window];

    if(main != nil) {
        [main makeKeyAndVisible];
    }

    return view;
}

RCT_EXPORT_VIEW_PROPERTY(fullScreen, BOOL)

@end
