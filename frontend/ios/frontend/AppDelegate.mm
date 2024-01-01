#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <TrustKit/TrustKit.h>


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  //[self initTrustKit];

  self.moduleName = @"main";
  //
  //
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

/*
- (void)initTrustKit {
      NSDictionary *trustKitConfig =
  @{
    kTSKSwizzleNetworkDelegates: @YES,                    
    kTSKPinnedDomains : @{
            @"https://3.121.219.180" : @{
              kTSKIncludeSubdomains: @YES,
              kTSKEnforcePinning : @YES,
              //kTSKDisableDefaultReportUri: @YES
                    kTSKPublicKeyHashes : @[
                        @"Upmz83F2acKWXA+7W9WVxADNxAvhiAobLZhoQvnBEsI=",
                        @"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
                            ],
              //kTSKPublicKeyAlgorithms : @[kTSKAlgorithmRsa2048],
                    },
            }};
    [TrustKit initSharedInstanceWithConfiguration:trustKitConfig];
}
*/

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@".expo/.virtual-metro-entry"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
@end

