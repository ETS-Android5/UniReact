#import <React/RCTViewManager.h>
#import <React/RCTBridgeModule.h>
#include <UnityFramework/UnityFramework.h>
#import "UnityView.h"

@interface UnityViewManager : RCTViewManager <RCTBridgeModule>

@property UnityFramework * ufw;

@end
