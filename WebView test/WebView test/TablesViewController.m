//
//  TablesViewController.m
//  WebView test
//
//  Created by Vytautas on 6/15/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import "TablesViewController.h"
#import <QuartzCore/QuartzCore.h>

@implementation TablesViewController

@synthesize titleLabel, which;

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
    [titleLabel release];
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
    //self.myWebView.backgroundColor = [UIColor redColor];
    self.navigationController.navigationBar.layer.contents = (id)[UIImage imageNamed:@"nav_bar_2.png"].CGImage;
    self.titleLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, 320, 44)];
    self.titleLabel.text = @"Lentelės";
    self.titleLabel.textAlignment = UITextAlignmentCenter;
    self.titleLabel.backgroundColor = [UIColor clearColor];
    self.titleLabel.textColor = [UIColor whiteColor];
    self.titleLabel.font = [UIFont boldSystemFontOfSize:20];
    self.titleLabel.shadowColor = [UIColor colorWithWhite:0.0 alpha:0.5];
    
    self.which = YES; // YES - segmented index 0; NO - segmented index 1;
    
//    self.myWebView = [[UIWebView alloc] initWithFrame:self.view.bounds];
//    [self.view addSubview:self.myWebView];
//    self.myWebView.delegate = self;
}

- (void)viewWillAppear:(BOOL)animated
{

    if (self.goViewController != nil)
    {
        [self.goViewController release];
        self.goViewController = nil;
    }
    
    [self.navigationController setNavigationBarHidden:NO animated:YES];
    
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
    [super viewDidAppear:animated];

    NSBundle *mainBundle = [NSBundle mainBundle];
    NSString *stringUrl = [mainBundle pathForResource:@"index" ofType:@"html"];
    NSURL *baseUrl = [NSURL fileURLWithPath:stringUrl];
    NSURL *fullURL = [NSURL URLWithString:@"#tables" relativeToURL:baseUrl];
  //  NSURL *fullURL = [NSURL URLWithString:@"http://google.lt"];
    NSURLRequest *urlRequest = [NSURLRequest requestWithURL:fullURL];
    [self.myWebView loadRequest:urlRequest];

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

#pragma mark - Methods

- (IBAction)switchTables
{
    NSBundle *mainBundle = [NSBundle mainBundle];
    NSString *stringUrl = [mainBundle pathForResource:@"index" ofType:@"html"];
    NSURL *baseUrl = [NSURL fileURLWithPath:stringUrl];
    NSURL *fullURL;
    
    if (self.which)
    {
        fullURL = [NSURL URLWithString:@"coco://params=%7B'go':'tables','params':'/dubleriai'%7D" relativeToURL:baseUrl];
        self.which = NO;
    }
    else
    {
        fullURL = [NSURL URLWithString:@"coco://params=%7B'go':'tables','params':'/alyga'%7D" relativeToURL:baseUrl];
        self.which = YES;
    }
    NSURLRequest *urlRequest = [NSURLRequest requestWithURL:fullURL];
    [self.myWebView loadRequest:urlRequest];
}

@end
