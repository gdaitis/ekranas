//
//  GenericViewController.h
//  WebView test
//
//  Created by Vytautas on 5/6/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <MessageUI/MessageUI.h>

@class GoViewController;
@class TablesViewController;

@interface GenericViewController : UIViewController <UIWebViewDelegate, MFMessageComposeViewControllerDelegate>
{
    IBOutlet UIWebView *myWebView;
    IBOutlet UIActivityIndicatorView *activityIndicator;
    GoViewController *goViewController;
    TablesViewController *tablesViewController;
    BOOL firstTime;
}

@property (nonatomic, retain) IBOutlet UIWebView *myWebView;
@property (nonatomic, retain) IBOutlet UIActivityIndicatorView *activityIndicator;
@property (nonatomic, retain) GoViewController *goViewController;
@property (nonatomic, retain) TablesViewController *tablesViewController;
@property BOOL firstTime;

@end
