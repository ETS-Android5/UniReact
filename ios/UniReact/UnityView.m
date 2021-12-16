#import "UnityView.h"
#import "UnityModule.h"

NSDictionary* appLaunchOpts;
UIView* _unityView;

@implementation UnityView


-(id)initWithFrame:(CGRect)frame
{
  // NSLog(@"Hello, initWithFrame");
  self = [super initWithFrame:frame];
  if (self) {
    _unityView = [[[UnityModule launchWithOptions:appLaunchOpts] appController] rootView];
  }
  return self;
}

- (void)setFullScreen:(bool)fullScreen
{
  // NSLog(@"Hello, setFullScreen!");
  _fullScreen = fullScreen;
}

- (void)setUnityView:(UIView *)view
{
  // NSLog(@"Hello, setUnityView!");
    self.uView = view;
  
    [self setNeedsLayout];
}

- (void)dealloc
{
  // NSLog(@"Hello, dealloc!");
}

- (void)layoutSubviews
{
  // NSLog(@"Hello, layoutSubviews!");
    [super layoutSubviews];

    if (!_fullScreen) {
        [_unityView removeFromSuperview];
        _unityView.frame = self.bounds;
        [self insertSubview:_unityView atIndex:0];
    } else {
        UIWindow* unityWindow = [[[UnityModule ufw] appController] window];
        CGRect viewRect = CGRectMake(0, 0, self.bounds.size.width, self.bounds.size.height);
        unityWindow.frame = viewRect;
    }
}

@end
