#import <Foundation/Foundation.h>
#import "NativeCallProxy.h"


@implementation FrameworkLibAPI

id<NativeCallsProtocol> api = NULL;
+(void) registerAPIforNativeCalls:(id<NativeCallsProtocol>) aApi
{
    api = aApi;
}

@end


//extern "C" {
//    void showHostMainWindow(const char* color) { return [api showHostMainWindow:[NSString stringWithUTF8String:color]]; }
//}
extern "C" {
    void unityToIos(const char* str) {
        NSLog(@"Hello, unityToIOS NativeCallProxy!");
        [api unityToIos:[NSString stringWithUTF8String:str]];
     }
}
//extern "C" void unityToIOS(char *str) {
//    NSString* objcstring = @(str);
//    NSDictionary* dict = @{ @"data": objcstring};
//    [[NSNotificationCenter defaultCenter] postNotificationName:@"NotificationName"
//        object:nil userInfo:dict];
//}
