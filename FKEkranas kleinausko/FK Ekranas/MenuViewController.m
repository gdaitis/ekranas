//
//  MenuViewController.m
//  FK Ekranas
//
//  Created by Tadas Kleinauskas on 8/4/11.
//  Copyright 2011 Baltic Web Studio. All rights reserved.
//

#import "MenuViewController.h"


@implementation MenuViewController



- (void)setTitle:(NSString *)title
{
    [super setTitle:title];
    
    UIImageView *titleview = [[UIImageView alloc] initWithFrame:CGRectMake(self.navigationController.navigationBar.bounds.size.width/2-25,0,50,44)];
    [titleview setImage:[UIImage imageNamed:@"graphics/logo.png"]];
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
    
    if([self.navigationController.tabBarItem.title isEqual:@"Sezonas"])
    {
        self.hashString = @"sezonas";
    }
    if([self.navigationController.tabBarItem.title isEqual:@"Media"])
    {
        self.hashString = @"media";
    }
    if([self.navigationController.tabBarItem.title isEqual:@"Klubas"])
    {
        self.hashString = @"klubas";
    }
    if([self.navigationController.tabBarItem.title isEqual:@"Kita"])
    {
        self.hashString = @"more";
    }
    
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    
    [self setTitle:self.navigationController.tabBarItem.title];
    [self.view setBackgroundColor:[UIColor colorWithRed:28/255 green:28/255 blue:28/255 alpha:1.0]];
    [self.webview setBackgroundColor:[UIColor colorWithRed:28/255 green:28/255 blue:28/255 alpha:1.0]];
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
