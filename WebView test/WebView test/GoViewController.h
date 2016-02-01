//
//  GoViewController.h
//  WebView test
//
//  Created by Vytautas on 5/9/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "GenericViewController.h"

@interface GoViewController : GenericViewController 
{
    UIViewController *parent;
    NSString *barTitle;
    UILabel *titleLabel;
    NSURLRequest *myRequest;
}

@property (nonatomic, retain) UIViewController *parent;
@property (nonatomic, retain) NSString *barTitle;
@property (nonatomic, retain) UILabel *titleLabel;
@property (nonatomic, retain) NSURLRequest *myRequest;

@end
