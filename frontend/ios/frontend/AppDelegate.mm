#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <TrustKit/TrustKit.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Dodaj konfigurację TrustKit
  NSDictionary *trustKitConfig =
  @{
    kTSKSwizzleNetworkDelegates: @YES,
    kTSKPinnedDomains: @{
        @"https://3.121.219.180" : @{
            kTSKIncludeSubdomains: @YES,
            kTSKEnforcePinning: @YES,
            kTSKDisableDefaultReportUri: @YES,
            kTSKPublicKeyHashes : @[
              @"2d5e9fc9183e9542479e116a3b8f877d3c196f5cddd70321799167f46138b160", // Primary SHA256 key
              @"2d5e9fc9183e9542479e116a3b8f877d3c196f5cddd70321799167f46138b160", // Backup SHA256 key
            ],
        },
    }};
  [TrustKit initSharedInstanceWithConfiguration:trustKitConfig];

  // Reszta kodu

  self.moduleName = @"main";
  // Możesz dodać swoje niestandardowe propsy początkowe w słowniku poniżej.
  // Będą one przekazane do ViewController używanego przez React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@".expo/.virtual-metro-entry"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end

