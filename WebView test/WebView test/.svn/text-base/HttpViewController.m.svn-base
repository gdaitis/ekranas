//
//  HttpViewController.m
//  WebView test
//
//  Created by Vytautas on 5/10/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import "HttpViewController.h"

@implementation HttpViewController

@synthesize activityIndicator, myWebView;

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
    [activityIndicator release];
    [myWebView release];
}

- (void)didReceiveMemoryWarning
{
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
    
    // Release any cached data, images, etc that aren't in use.
}

#pragma mark - View lifecycle

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    
    self.view.backgroundColor = [UIColor colorWithRed:(28/255) green:(28/255) blue:(28/255) alpha:1.0];

    self.myWebView.opaque = NO;
    self.myWebView.alpha = 0.0;
    self.myWebView.backgroundColor = [UIColor colorWithRed:(28/255) green:(28/255) blue:(28/255) alpha:1.0];
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

#pragma mark - UIWebView delegate methods

- (void)webViewDidStartLoad:(UIWebView *)webView
{
    NSLog(@"HTTP Loading");
    [self.activityIndicator startAnimating];
    self.myWebView.alpha = 0.0;
}

- (void)webViewDidFinishLoad:(UIWebView *)webView
{
    NSLog(@"HTTP Loaded");
    [self.activityIndicator stopAnimating];
    self.myWebView.alpha = 1.0;
}

@end
