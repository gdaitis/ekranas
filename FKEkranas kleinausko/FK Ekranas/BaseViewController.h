//
//  BaseViewController.h
//  FK Ekranas
//
//  Created by Tadas Kleinauskas on 8/3/11.
//  Copyright 2011 Baltic Web Studio. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "SBJson.h"
#import <MessageUI/MessageUI.h>

@interface BaseViewController : UIViewController <UIWebViewDelegate, MFMessageComposeViewControllerDelegate> {
    
}

@property (nonatomic, copy) NSString *hashString;
@property (nonatomic, retain) IBOutlet UIWebView *webview;
@property (nonatomic, retain) IBOutlet UIActivityIndicatorView *loader;

@end
