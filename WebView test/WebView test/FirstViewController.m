//
//  FirstViewController.m
//  WebView test
//
//  Created by Vytautas on 4/27/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import "FirstViewController.h"

@implementation FirstViewController

// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad
{
    [super viewDidLoad];

    NSBundle *mainBundle = [NSBundle mainBundle];
    NSString *stringUrl = [mainBundle pathForResource:@"index" ofType:@"html"];
    NSURL *baseUrl = [NSURL fileURLWithPath:stringUrl];
    NSURL *fullURL = [NSURL URLWithString:@"#home" relativeToURL:baseUrl];
    NSURLRequest *urlRequest = [NSURLRequest requestWithURL:fullURL];
    
    [self.myWebView loadRequest:urlRequest];
    
    //[self.myWebView stringByEvaluatingJavaScriptFromString:@"window.location.hash = \"article/id/123\";"];
    //[self.myWebView stringByEvaluatingJavaScriptFromString:@"coco.nativeready();"];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}


- (void)didReceiveMemoryWarning
{
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
    
    // Release any cached data, images, etc. that aren't in use.
}


- (void)viewDidUnload
{
    [super viewDidUnload];

    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (void)dealloc
{
    [super dealloc];
}

@end
