//
//  HomeViewController.m
//  FK Ekranas
//
//  Created by Tadas Kleinauskas on 8/3/11.
//  Copyright 2011 Baltic Web Studio. All rights reserved.
//

#import "HomeViewController.h"


@implementation HomeViewController

- (void)viewWillDisappear:(BOOL)animated
{
    
}
- (void)viewWillAppear:(BOOL)animated
{
    
}

- (void)setTitle:(NSString *)title
{
    [super setTitle:title];
    
    UIImageView *titleview = [[UIImageView alloc] initWithFrame:self.navigationController.navigationBar.bounds];
    [titleview setImage:[UIImage imageNamed:@"graphics/home_toolbar.png"]];
    [titleview setOpaque:NO];
    self.navigationItem.titleView = titleview;
}

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

- (void)viewDidLoad
{
    self.hashString= @"home";
    
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    
    [self.webview setBackgroundColor:[UIColor colorWithRed:1 green:1 blue:1 alpha:1.0]];
    
    [self setTitle:@"Home"];
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
