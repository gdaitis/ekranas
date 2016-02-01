//
//  GoViewController.m
//  WebView test
//
//  Created by Vytautas on 5/9/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import "GoViewController.h"
#import <QuartzCore/QuartzCore.h>

@implementation GoViewController

@synthesize parent, barTitle, titleLabel, myRequest;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)dealloc
{
    [super dealloc];
    [parent release];
    [barTitle release];
    [titleLabel release];
    [myRequest release];
}

- (void)didReceiveMemoryWarning
{
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
    
    // Release any cached data, images, etc that aren't in use.
}

#pragma mark - View lifecycle

/*
// Implement loadView to create a view hierarchy programmatically, without using a nib.
- (void)loadView
{
}
*/

// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad
{
    [super viewDidLoad];
    
    if (self.activityIndicator == nil)
    {
        self.activityIndicator = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhiteLarge];
        self.activityIndicator.frame = CGRectMake(142, 165, 37, 37);
        [self.view addSubview:self.activityIndicator];
        [self.view bringSubviewToFront:self.activityIndicator];
    }
    
    self.navigationController.navigationBar.layer.contents = (id)[UIImage imageNamed:@"nav_bar_2.png"].CGImage;
    self.titleLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, 320, 44)];
    self.titleLabel.text = self.barTitle;
    self.titleLabel.textAlignment = UITextAlignmentCenter;
    self.titleLabel.backgroundColor = [UIColor clearColor];
    self.titleLabel.textColor = [UIColor whiteColor];
    self.titleLabel.font = [UIFont boldSystemFontOfSize:20];
    self.titleLabel.shadowColor = [UIColor colorWithWhite:0.0 alpha:0.5];
}

- (void)viewWillAppear:(BOOL)animated
{
    if (self.goViewController != nil)
    {
        [self.goViewController release];
        self.goViewController = nil;
    }
    
    if ([self.parent class] != [GoViewController class])
        [self.navigationController setNavigationBarHidden:NO animated:YES];
    else
        [self.navigationController setNavigationBarHidden:NO animated:NO];
    
    if ([self.titleLabel superview] == nil)
    {
        [self.navigationController.navigationBar addSubview:self.titleLabel];
        self.titleLabel.alpha = 0.0;
        [UIView beginAnimations:nil context:nil];
        self.titleLabel.alpha = 1.0;
        [UIView commitAnimations];
    }
}

- (void)viewDidAppear:(BOOL)animated
{
    NSLog(@"viewDidAppear");
    //[NSThread sleepForTimeInterval:1];
    [self.myWebView loadRequest:self.myRequest];
    
    for (id subview in myWebView.subviews)
    {
        if ([[subview class] isSubclassOfClass: [UIScrollView class]])
        {
            [subview setContentOffset:CGPointMake(0, 1)];
            [subview setContentOffset:CGPointMake(0, 0)];
        }
    }
}

- (void)viewWillDisappear:(BOOL)animated
{
    [UIView beginAnimations:nil context:nil];
    self.titleLabel.alpha = 0.0;
    [UIView commitAnimations];
    [self.titleLabel removeFromSuperview];
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}

@end
