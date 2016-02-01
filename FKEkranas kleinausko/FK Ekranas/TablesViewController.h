//
//  TablesViewController.h
//  FK Ekranas
//
//  Created by Tadas Kleinauskas on 8/3/11.
//  Copyright 2011 Baltic Web Studio. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "BaseViewController.h"


@interface TablesViewController : BaseViewController 
{
    IBOutlet UISegmentedControl *segmentedControl;
    UIWebView *webview2;
}

@property (nonatomic, retain) IBOutlet UISegmentedControl *segmentedControl;
@property (nonatomic, retain) IBOutlet UIWebView *webview2;

- (IBAction)segmentSwitched:(id)sender;

@end
