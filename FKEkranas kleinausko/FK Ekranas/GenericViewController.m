//
//  GenericViewController.m
//  FK Ekranas
//
//  Created by Tadas Kleinauskas on 8/4/11.
//  Copyright 2011 Baltic Web Studio. All rights reserved.
//

#import "GenericViewController.h"


@implementation GenericViewController

@synthesize logoView;

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
    
    [logoView release];
    [super dealloc];
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
    
//    CGRect logoRect = CGRectMake(self.navigationController.navigationBar.bounds.size.width - 50, 0.0, 50.0, 44.0);
//    self.logoView = [[UIImageView alloc] initWithFrame:logoRect];
//    [self.logoView setImage:[UIImage imageNamed:@"graphics/logo.png"]];
//    self.logoView.opaque = YES; // explicitly opaque for performance
//    [self.navigationController.navigationBar insertSubview:self.logoView atIndex:5];
    //[logoView release];
    if ([self.hashString hasPrefix:@"photo"]) {
        [self.view setBackgroundColor:[UIColor colorWithRed:28/255 green:28/255 blue:28/255 alpha:1.0]];
        [self.webview setBackgroundColor:[UIColor colorWithRed:28/255 green:28/255 blue:28/255 alpha:1.0]];
    }
    UIImageView *logo = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"graphics/logo.png"]];
    UIBarButtonItem *item = [[UIBarButtonItem alloc] initWithCustomView:logo];
    self.navigationItem.rightBarButtonItem = item;
    [logo release];
    [item release];
    
    [self.webview setBackgroundColor:[UIColor colorWithRed:1 green:1 blue:1 alpha:1.0]];
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    self.logoView = nil;
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}

@end
