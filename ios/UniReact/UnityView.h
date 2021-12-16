#import <UIKit/UIKit.h>
#include <UnityFramework/UnityFramework.h>
#include <UnityFramework/NativeCallProxy.h>

@interface UnityView : UIView

@property (nonatomic, strong) UIView* uView;
@property UnityFramework * ufw;
@property (nonatomic) bool fullScreen;

- (void)setUnityView:(UIView *)view;

@end
