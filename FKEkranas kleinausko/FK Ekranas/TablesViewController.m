//
//  TablesViewController.m
//  FK Ekranas
//
//  Created by Tadas Kleinauskas on 8/3/11.
//  Copyright 2011 Baltic Web Studio. All rights reserved.
//

#import "TablesViewController.h"


@implementation TablesViewController

@synthesize segmentedControl;
@synthesize webview2;

- (void)viewDidLoad
{               
    [super viewDidLoad];
    
    UIImageView *logo = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"graphics/logo.png"]];
    UIBarButtonItem *item = [[UIBarButtonItem alloc] initWithCustomView:logo];
    self.navigationItem.rightBarButtonItem = item;
    [logo release];
    [item release];
    
    [self.webview setBackgroundColor:[UIColor colorWithRed:1 green:1 blue:1 alpha:1.0]];
    
    self.webview2.alpha = 0;
    
    NSBundle *mainBundle = [NSBundle mainBundle];
    NSString *stringUrl = [mainBundle pathForResource:@"www/index" ofType:@"html"];
    NSURL *baseUrl = [NSURL fileURLWithPath:stringUrl];
    NSMutableString *params = [NSMutableString stringWithString: @"#"];
    [params appendString:@"tables/dubleriai"];
    NSURL *fullURL = [NSURL URLWithString:params relativeToURL:baseUrl];
    NSURLRequest *urlRequest = [NSURLRequest requestWithURL:fullURL];
    [self.webview2 loadRequest:urlRequest];
    [self.loader startAnimating];
    
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
    [segmentedControl release];
    webview2.delegate = nil;
    [webview2 release];
    [super dealloc];
}

- (void)didReceiveMemoryWarning
{
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
    
    // Release any cached data, images, etc that aren't in use.
}

#pragma mark - Public Methods

- (IBAction)segmentSwitched:(id)sender
{
    if (self.webview2.alpha == 0)
    {
        self.webview2.alpha = 1;
        self.webview.alpha = 0;
    }
    else
    {
        self.webview2.alpha = 0;
        self.webview.alpha = 1;
    }
}

#pragma mark - View lifecycle

- (void)viewDidUnload
{
    [self setSegmentedControl:nil];
    [self setWebview2:nil];
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
