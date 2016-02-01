//
//  ThirdViewController.m
//  WebView test
//
//  Created by Vytautas on 5/6/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import "ThirdViewController.h"


@implementation ThirdViewController

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
    
    for (id subview in myWebView.subviews)
    {
        if ([[subview class] isSubclassOfClass: [UIScrollView class]])
            if([subview respondsToSelector:@selector(setScrollingEnabled:)])     
                [subview performSelector:@selector(setScrollingEnabled:) withObject:NO];
    }
    
    NSBundle *mainBundle = [NSBundle mainBundle];
    NSString *stringUrl = [mainBundle pathForResource:@"index" ofType:@"html"];
    NSURL *baseUrl = [NSURL fileURLWithPath:stringUrl];
    NSURL *fullURL = [NSURL URLWithString:@"#media" relativeToURL:baseUrl];
    NSURLRequest *urlRequest = [NSURLRequest requestWithURL:fullURL];
    
    [self.myWebView loadRequest:urlRequest];
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
