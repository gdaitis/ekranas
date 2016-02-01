//
//  BaseViewController.m
//  FK Ekranas
//
//  Created by Tadas Kleinauskas on 8/3/11.
//  Copyright 2011 Baltic Web Studio. All rights reserved.
//

#import "BaseViewController.h"
#import "GenericViewController.h"
#import "TablesViewController.h"
#import <MediaPlayer/MediaPlayer.h>
#import <MessageUI/MessageUI.h>

@implementation BaseViewController

@synthesize hashString, webview, loader;

- (void)viewWillDisappear:(BOOL)animated
{
    if(self != nil && self.webview != nil)
    {
        //[self.webview stopLoading];
    }
    if(self != nil && self.webview != nil && self.webview.delegate != nil)
    {
        self.webview.delegate = nil;
    }
}
- (void)viewWillAppear:(BOOL)animated
{
    if(self != nil && self.webview != nil)
    {
        self.webview.delegate = self;
    }
}

- (BOOL)webView:(UIWebView *)theWebView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
    NSString *urlStr = [[request URL] absoluteString];
    
    if ([urlStr hasPrefix:@"cocotp://"])
    {
        NSString *newURLstr = [urlStr stringByReplacingOccurrencesOfString:@"cocotp://" withString:@"http://"];
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:newURLstr]];
        return NO;
    }
    
    if ([urlStr hasPrefix:@"coco://params="])
    {
        NSRange range = [urlStr rangeOfString:@"="];
		int index = range.location + range.length;
        NSString *jsonString = [[[urlStr substringFromIndex:index] stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding] stringByReplacingOccurrencesOfString:@"'" withString:@"\""];
        NSLog(@"%@", jsonString);
        SBJsonParser *parser = [[SBJsonParser alloc] init];
        NSError *error;
        NSDictionary *json = [parser objectWithString:jsonString error:&error];
        [parser release];
        
        NSLog(@"%@", json);
        
        if ([json objectForKey:@"html"])
        {
            NSString *str = [json objectForKey:@"html"];
            if ([str isEqual:@"loaded"]) 
            {
                [self.loader stopAnimating];
                self.webview.alpha = 1.0;
            }
        }
        if ([json objectForKey:@"media"])
        {
            NSString *str = [json objectForKey:@"media"];
            
            // Video
            if ([str isEqual:@"video"])
            {
                NSString *videoURLString = [json objectForKey:@"url"];
                NSURL *videoURL = [NSURL URLWithString:videoURLString];
                MPMoviePlayerViewController *moviePlayerView = [[[MPMoviePlayerViewController alloc] initWithContentURL:videoURL] autorelease];
                [self presentMoviePlayerViewControllerAnimated:moviePlayerView];
            }
            
            // SMS
            if ([str isEqual:@"sms"])
            {
                NSString *number = [json objectForKey:@"number"];
                NSString *text = [[json objectForKey:@"text"] stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
                MFMessageComposeViewController *controller = [[[MFMessageComposeViewController alloc] init] autorelease];
                if([MFMessageComposeViewController canSendText])
                {
                    controller.body = text;
                    controller.recipients = [NSArray arrayWithObjects:number, nil];
                    controller.messageComposeDelegate = self;
                    [self presentModalViewController:controller animated:YES];
                }
            }
        }
        if ([json objectForKey:@"go"])
        {
            NSString *str = [json objectForKey:@"go"];
            GenericViewController *new = [[GenericViewController alloc] initWithNibName:@"GenericViewController" bundle:[NSBundle mainBundle]];
            
            // #home (index.html)
            if ([str isEqual:@"article"]) 
            {
                NSMutableString *view = [NSMutableString stringWithString: @"article"];
                [view appendString:[json objectForKey:@"params"]];
                [new setHashString:view];
                [new setTitle:@"Naujienos"];
            }
            
            // galerijų valdymas, naudojamas #home ir #media
            if ([str isEqual:@"gallery"])
            {
                NSMutableString *view = [NSMutableString stringWithString: @"gallery"];
                [view appendString:[json objectForKey:@"params"]];
                [new setHashString:view];
                [new setTitle:@"Galerija"];
            }
            if ([str isEqual:@"photo"])
            {
                NSMutableString *view = [NSMutableString stringWithString: @"photo"];
                [view appendString:[json objectForKey:@"params"]];
                [new setHashString:view];
                [new setTitle:@"Galerija"];
            }
            
            // #sezonas
            if ([str isEqual:@"team"]) 
            {
                [new setHashString:@"team"];
                [new setTitle:@"Komanda"];
            }
            if ([str isEqual:@"player"]) 
            {
                NSMutableString *view = [NSMutableString stringWithString: @"player"];
                [view appendString:[json objectForKey:@"params"]];
                [new setHashString:view];
                [new setTitle:@"Komanda"];
            }
            if ([str isEqual:@"calendar"])
            {
                [new setHashString:@"calendar"];
                [new setTitle:@"Kalendorius"];
            }
            if ([str isEqual:@"tables"])
            {
//                [new setHashString:@"tables"];
//                [new setTitle:@"Lentelės"];
                TablesViewController *tablesViewController = [[TablesViewController alloc] init];
                [tablesViewController setHashString:@"tables/alyga"];    
                [tablesViewController setTitle: @"Lentelės"];                
                
                [self.navigationController pushViewController:tablesViewController animated:YES];
                [tablesViewController release];
                [new release];
                return NO;
            }
            if ([str isEqual:@"tickets"])
            {
                [new setHashString:@"tickets"];
                [new setTitle:@"Bilietai"];
            }
            
            // #media
            if ([str isEqual:@"fketv"])
            {
                [new setHashString:@"fketv"];
                [new setTitle:@"FKE TV"];
            }
            if ([str isEqual:@"fkelive"])
            {
                [new setHashString:@"fkelive"];
                [new setTitle:@"FKE LIVE"];
            }
            if ([str isEqual:@"fkemobile"])
            {
                [new setHashString:@"fkemobile"];
                [new setTitle:@"FKE MOBILE"];
            }
            if ([str isEqual:@"galleries"])
            {
                [new setHashString:@"galleries"];
                [new setTitle:@"Foto galerija"];
            }
            // galerijų valdymas jau aprašytas 
            
            // #klubas
            if ([str isEqual:@"history"])
            {
                [new setHashString:@"history"];
                [new setTitle:@"Istorija"];
            }
            if ([str isEqual:@"stadium"])
            {
                [new setHashString:@"stadium"];
                [new setTitle:@"Staionas"];
            }
            if ([str isEqual:@"administration"])
            {
                [new setHashString:@"administration"];
                [new setTitle:@"Administracija"];
            }
            if ([str isEqual:@"sponsors"])
            {
                [new setHashString:@"sponsors"];
                [new setTitle:@"Rėmėjai"];
            }
            
            // #more
            if ([str isEqual:@"feedback"])
            {
                [new setHashString:@"feedback"];
                [new setTitle:@"Feedback"];
            }
            if ([str isEqual:@"geeks"])
            {
                [new setHashString:@"geeks"];
                [new setTitle:@"Aplikacijos kūrėjai"];
            }

            [self.navigationController pushViewController:new animated:YES];
            [new release];
        }
        return NO;
    }
    
    return YES;
}

- (void)dealloc
{
    self.hashString = nil;
    self.loader =  nil;
    self.webview.delegate = nil;
    self.webview = nil;
    
    //[webview release];
    [super dealloc];
}

- (void)didReceiveMemoryWarning
{
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
    
    // Release any cached data, images, etc that aren't in use.
}

#pragma mark - MFMessageComposeViewController delegate methods

- (void)messageComposeViewController:(MFMessageComposeViewController *)controller didFinishWithResult:(MessageComposeResult)result
{
    [self.navigationController dismissModalViewControllerAnimated:YES];
}

#pragma mark - View lifecycle

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    
    UIBarButtonItem *back = [[UIBarButtonItem alloc] initWithTitle:@"Atgal" style:UIBarButtonItemStyleBordered target:nil action:nil];
    self.navigationItem.backBarButtonItem = back;
    
    [back release];
    
    NSBundle *mainBundle = [NSBundle mainBundle];
    NSString *stringUrl = [mainBundle pathForResource:@"www/index" ofType:@"html"];
    NSURL *baseUrl = [NSURL fileURLWithPath:stringUrl];
    NSMutableString *params = [NSMutableString stringWithString: @"#"];
    [params appendString:self.hashString];
    NSURL *fullURL = [NSURL URLWithString:params relativeToURL:baseUrl];
    NSURLRequest *urlRequest = [NSURLRequest requestWithURL:fullURL];
    [self.webview loadRequest:urlRequest];
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
