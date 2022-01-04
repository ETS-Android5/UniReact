
#import <Foundation/Foundation.h>
#import "UnityModule.h"

@interface UnityModule ()
@end

@implementation UnityModule

RCT_EXPORT_MODULE(UnityModule);

bool hasListeners;

static id<UnityModuleFramework> _UnityModuleFramework;

static char ** _UnityModule_argv;

+ (char **)argv {
    @synchronized (self) {
        return _UnityModule_argv;
    }
}

+ (void)setArgv:(char **)argv {
    @synchronized (self) {
        _UnityModule_argv = argv;
    }
}

static int _UnityModule_argc;

+ (int)argc {
    @synchronized (self) {
        return _UnityModule_argc;
    }
}

+ (void)setArgc:(int)argc {
    @synchronized (self) {
        _UnityModule_argc = argc;
    }
}

+ (id<UnityModuleFramework>)ufw {
    @synchronized (self) {
        return _UnityModuleFramework;
    }
}

+ (void)setUfw:(id<UnityModuleFramework>)ufw {
    @synchronized (self) {
        _UnityModuleFramework = ufw;
    }
}

+ (id<UnityModuleFramework>) launchWithOptions:(NSDictionary*)applaunchOptions {

    NSString* bundlePath = nil;
    bundlePath = [[NSBundle mainBundle] bundlePath];
    bundlePath = [bundlePath stringByAppendingString: @"/Frameworks/UnityFramework.framework"];

    NSBundle* bundle = [NSBundle bundleWithPath: bundlePath];
    if ([bundle isLoaded] == false) [bundle load];

    id<UnityModuleFramework> framework = [bundle.principalClass getInstance];
    if (![framework appController]) {
        // unity is not initialized
        [framework setExecuteHeader: &_mh_execute_header];
    }
    [framework setDataBundleId: [bundle.bundleIdentifier cStringUsingEncoding:NSUTF8StringEncoding]];
    [[UnityModule ufw] registerFrameworkListener: sharedInstance];
    [NSClassFromString(@"FrameworkLibAPI") registerAPIforNativeCalls:sharedInstance];
    [framework runEmbeddedWithArgc: self.argc argv: self.argv appLaunchOpts: applaunchOptions];
    
    [self setUfw:framework];

    return self.ufw;
}
static UnityModule *sharedInstance;

RCT_EXPORT_METHOD(initialize) {
  sharedInstance =self;
  [[UnityModule ufw] registerFrameworkListener: sharedInstance];
    [NSClassFromString(@"FrameworkLibAPI") registerAPIforNativeCalls:sharedInstance];

}

RCT_EXPORT_METHOD(postMessage:(nonnull NSString *)gameObject
                  functionName:(nonnull NSString *)functionName
                  message:(nonnull NSString *)message) {
    [[UnityModule ufw] sendMessageToGOWithName:[gameObject UTF8String] functionName:[functionName UTF8String] message:[message UTF8String]];
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"UnityMessage"];
}

-(void)startObserving {
    self.hasListeners = YES;
}

-(void)stopObserving {
    self.hasListeners = NO;
}
- (void)unityToIos:(NSString*)message
{
//   NSLog(@"Hello, sendMessage");
    if (self.hasListeners) {
    //   NSLog(@"Hello, sendMessage 2");
        [self sendEventWithName:@"UnityMessage" body:message];
    }
}
@end
