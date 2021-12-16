#import <UIKit/UIKit.h>
#import "UnityModule.h"
#import "AppDelegate.h"

int main(int argc, char * argv[]) {
  @autoreleasepool {
    [UnityModule setArgc:argc];
    [UnityModule setArgv:argv];
    return UIApplicationMain(argc, argv, nil, NSStringFromClass([AppDelegate class]));
  }
}
