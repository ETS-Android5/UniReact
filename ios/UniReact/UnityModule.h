
#import <Foundation/Foundation.h>

#import <UIKit/UIKit.h>

#include <mach-o/ldsyms.h>

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#include <UnityFramework/UnityAppController.h>
#include <UnityFramework/UnityFramework.h>
#include <UnityFramework/NativeCallProxy.h>

@protocol UnityModuleAppController <UIApplicationDelegate>

- (UIWindow *)window;
- (UIView *)rootView;
- (UnityView *)unityView;

@end


@protocol UnityModuleFramework <NSObject>

+ (id<UnityModuleFramework>)getInstance;
- (id<UnityModuleAppController>)appController;

- (void)setExecuteHeader:(const typeof(_mh_execute_header)*)header;
- (void)setDataBundleId:(const char*)bundleId;

- (void)runEmbeddedWithArgc:(int)argc argv:(char*[])argv appLaunchOpts:(NSDictionary*)appLaunchOpts;

- (void)unloadApplication;

- (void)showUnityWindow;

- (void)quitApplication:(int)exitCode;

- (void)pause:(bool)pause;

- (void)sendMessageToGOWithName:(const char*)goName functionName:(const char*)name message:(const char*)msg;

- (void)registerFrameworkListener:(id<UnityFrameworkListener>)obj;

@end

typedef void (*unity_receive_handshake)();
typedef void (*unity_receive_command)(const char *);

@interface UnityModule : RCTEventEmitter <RCTBridgeModule, UnityFrameworkListener, NativeCallsProtocol>

@property (atomic, class) int argc;
@property (atomic, class) char** argv;

@property (atomic, class) id<UnityModuleFramework> ufw;

+ (id<UnityModuleFramework>)launchWithOptions:(NSDictionary*)launchOptions;
@property (nonatomic) BOOL hasListeners;
@end

