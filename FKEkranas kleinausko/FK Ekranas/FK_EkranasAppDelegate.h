//
//  FK_EkranasAppDelegate.h
//  FK Ekranas
//
//  Created by Tadas Kleinauskas on 8/3/11.
//  Copyright 2011 Baltic Web Studio. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "BaseViewController.h"

@interface FK_EkranasAppDelegate : NSObject <UIApplicationDelegate, UITabBarControllerDelegate> {
    
}

@property (nonatomic, retain) IBOutlet UIWindow *window;

@property (nonatomic, retain) IBOutlet UITabBarController *tabBarController;

@end
