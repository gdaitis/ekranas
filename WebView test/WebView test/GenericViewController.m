//
//  GenericViewController.m
//  WebView test
//
//  Created by Vytautas on 5/6/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import "GenericViewController.h"
#import "GoViewController.h"
#import "TablesViewController.h"
#import "JSON.h"
#import <MediaPlayer/MediaPlayer.h>
#import <MessageUI/MessageUI.h>

@implementation GenericViewController

@synthesize myWebView, activityIndicator, goViewController, tablesViewController, firstTime;

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
    [myWebView release];
    [activityIndicator release];
    [goViewController release];
    [tablesViewController release];
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
    
    self.firstTime = YES;
    self.myWebView.opaque = NO;
    self.myWebView.alpha = 0.0;
    self.myWebView.dataDetectorTypes = UIDataDetectorTypeNone;
    self.myWebView.backgroundColor = [UIColor colorWithRed:(28/255) green:(28/255) blue:(28/255) alpha:1.0];
    
    self.navigationItem.backBarButtonItem = [[[UIBarButtonItem alloc] initWithTitle:@"Atgal" style:UIBarButtonItemStylePlain target:nil action:nil] autorelease];
}

- (void)viewWillAppear:(BOOL)animated
{
    if (self.firstTime == YES)
    {
        [self.navigationController setNavigationBarHidden:YES animated:NO];
        self.firstTime = NO;
    }
    else
    {
        [self.navigationController setNavigationBarHidden:YES animated:YES];
    }
    
    if (self.goViewController != nil)
    {
        [self.goViewController release];
        self.goViewController = nil;
    }
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
    NSLog(@"Loading");
    [self.activityIndicator startAnimating];
    self.myWebView.alpha = 1.0;
}

- (void)webViewDidFinishLoad:(UIWebView *)webView
{
    NSLog(@"webViewDidFinishLoad");
    NSString *html = [self.myWebView stringByEvaluatingJavaScriptFromString:@"document.getElementsByTagName('html')[0].innerHTML"];
    NSLog(@"content: %@",html);
}

- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
    NSString *urlStr = [[request URL] absoluteString];
    //NSLog(@"GAUTAS URL POKYTIS: %@", urlStr);
    
    // Jeigu užklausa yra cocotp:// 
    
    
    // Parsinami Javascript'o paduodami parametrai
    if ([urlStr hasPrefix:@"coco://params="])
    {
        NSRange range = [urlStr rangeOfString:@"="];
		int index = range.location + range.length;
		NSString *jsonString = [[[[urlStr substringFromIndex:index] stringByReplacingOccurrencesOfString:@"%7B" withString:@"{"] stringByReplacingOccurrencesOfString:@"%7D" withString:@"}"] stringByReplacingOccurrencesOfString:@"'" withString:@"\""];
        NSLog(@"Result: %@", jsonString);
        SBJsonParser *parser = [[SBJsonParser alloc] init];
        NSError *error;
        NSDictionary *json = [parser objectWithString:jsonString error:&error];
        NSLog(@"%@", json);
        // Tikrinam parsintus duomenis
        
        // Parametras: "html"
        if ([json objectForKey:@"html"])
        {
            NSString *str = [json objectForKey:@"html"];
            // Viskas užsikrovė:
            if ([str isEqual:@"loaded"]) 
            {
                [self.activityIndicator stopAnimating];
                self.myWebView.alpha = 1.0;
                NSLog(@"Loaded");
                //NSString *html = [self.myWebView stringByEvaluatingJavaScriptFromString:@"document.getElementsByTagName('html')[0].innerHTML"];
                //NSLog(@"content  %@",html);
                
                
                return NO;
            }
        }
        
        // Parametras: "go"
        if ([json objectForKey:@"go"])
        {
            NSString *hash = [json objectForKey:@"go"];
            NSString *params = [json objectForKey:@"params"];
            NSString *galune;
            if (params == nil)
            {
                galune = [NSString stringWithFormat:@"#%@", hash];
            }
            else
            {
                galune = [NSString stringWithFormat:@"#%@%@", hash, params];
            }
            
            NSLog(@"Galune: %@", galune);
            
            NSBundle *mainBundle = [NSBundle mainBundle];
            NSString *stringUrl = [mainBundle pathForResource:@"index" ofType:@"html"];
            
                       
            NSURL *baseUrl = [NSURL fileURLWithPath:stringUrl];
            NSURL *fullURL = [NSURL URLWithString:galune relativeToURL:baseUrl];
            NSLog(@"%@", [fullURL absoluteString]);
            NSURLRequest *urlRequest = [NSURLRequest requestWithURL:fullURL];
            
            if ([hash isEqual:@"tables"])
            {
                if (params == nil)
                {
                    if (self.tablesViewController == nil)
                    {
                        self.tablesViewController = [[TablesViewController alloc] init];
                    }
                [self.navigationController pushViewController:self.tablesViewController animated:YES];
  
                }
                else
                {
                 //   [self.myWebView loadRequest:urlRequest];
                }
                return NO;
            }
            if (self.goViewController == nil)
            {
                self.goViewController = [[GoViewController alloc] initWithNibName:@"GoView" bundle:[NSBundle mainBundle]];
                //self.goViewController.myWebView.delegate = self.goViewController;
                //self.goViewController.myWebView.dataDetectorTypes = UIDataDetectorTypeLink;
            }
            self.goViewController.parent = self;
            self.goViewController.myRequest = urlRequest;
        
            // Nustatom navigation controller bar title
        
            if ([hash isEqual:@"article"])
                self.goViewController.barTitle = [NSString stringWithFormat:@"Naujienos"];
            if ([hash isEqual:@"gallery"])
                self.goViewController.barTitle = [NSString stringWithFormat:@"Galerija"];
            if ([hash isEqual:@"photo"])
                self.goViewController.barTitle = [NSString stringWithFormat:@"Galerija"];
            if ([hash isEqual:@"team"])
                self.goViewController.barTitle = [NSString stringWithFormat:@"Komanda"];
            if ([hash isEqual:@"player"])
                self.goViewController.barTitle = [NSString stringWithFormat:@"Komanda"];
            if ([hash isEqual:@"calendar"])
                self.goViewController.barTitle = [NSString stringWithFormat:@"Kalendorius"];
            if ([hash isEqual:@"tables"])
                self.goViewController.barTitle = [NSString stringWithFormat:@"Lentelės"];
            if ([hash isEqual:@"tickets"])
                self.goViewController.barTitle = [NSString stringWithFormat:@"Bilietai"];
            if ([hash isEqual:@"fketv"])
                self.goViewController.barTitle = [NSString stringWithFormat:@"FKE TV"];
            if ([hash isEqual:@"fkelive"])
                self.goViewController.barTitle = [NSString stringWithFormat:@"FKE LIVE"];
            if ([hash isEqual:@"galleries"])
                self.goViewController.barTitle = [NSString stringWithFormat:@"Foto galerija"];
            if ([hash isEqual:@"fkemobile"])
                self.goViewController.barTitle = [NSString stringWithFormat:@"FKE MOBILE"];
            if ([hash isEqual:@"history"])
                self.goViewController.barTitle = [NSString stringWithFormat:@"Istorija"];
            if ([hash isEqual:@"stadium"])
                self.goViewController.barTitle = [NSString stringWithFormat:@"Stadionas"];
            if ([hash isEqual:@"administration"])
                self.goViewController.barTitle = [NSString stringWithFormat:@"Administracija"];
            if ([hash isEqual:@"sponsors"])
                self.goViewController.barTitle = [NSString stringWithFormat:@"Rėmėjai"];
            if ([hash isEqual:@"feedback"])
                self.goViewController.barTitle = [NSString stringWithFormat:@"Feedback"];
            if ([hash isEqual:@"geeks"])
                self.goViewController.barTitle = [NSString stringWithFormat:@"Kūrėjai"];
        
            [self.navigationController pushViewController:self.goViewController animated:YES];
            
            return NO;

        }
        
        // Parametras: "media"
        if ([json objectForKey:@"media"])
        {
            NSString *str = [json objectForKey:@"media"];
            
            // Video
            if ([str isEqual:@"video"])
            {
                NSString *videoURLString = [json objectForKey:@"url"];
                NSLog(@"URL: %@", videoURLString);
                NSURL *videoURL = [NSURL URLWithString:videoURLString];
                MPMoviePlayerViewController *moviePlayerView = [[[MPMoviePlayerViewController alloc] initWithContentURL:videoURL] autorelease];
                [self presentMoviePlayerViewControllerAnimated:moviePlayerView];
            }
            
            // SMS
            if ([str isEqual:@"sms"])
            {
                NSString *number = [json objectForKey:@"number"];
                NSString *text = [json objectForKey:@"text"];
                MFMessageComposeViewController *controller = [[[MFMessageComposeViewController alloc] init] autorelease];
                if([MFMessageComposeViewController canSendText])
                {
                    controller.body = text;
                    controller.recipients = [NSArray arrayWithObjects:number, nil];
                    controller.messageComposeDelegate = self;
                    [self presentModalViewController:controller animated:YES];
                }
//                else
//                {
//                    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Klaida" message:@"Iš jūsų įrenginio žinučių siųsti negalima" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil];
//                    [alert show];
//                    [alert release];
//                }
            }
        }
    }
    
    if ([urlStr hasPrefix:@"cocotp://"])
    {
        NSString *newURLstr = [urlStr stringByReplacingOccurrencesOfString:@"cocotp://" withString:@"http://"];
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:newURLstr]];
        return NO;
    }
    
    return YES;
}

- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error
{
//    // load error, hide the activity indicator in the status bar
//    [UIApplication sharedApplication].networkActivityIndicatorVisible = NO;
//    
//    if ([error code] == NSURLErrorCancelled) {
//        // don't show the error
//        
//        // if you want to know why I ignore these errors
//        // check out this question:
//        // http://stackoverflow.com/questions/1577670
//        return;
//    }   
//    
    NSLog(@"Failed to load page: %@ %08d", [error localizedDescription], [error code]);
    NSLog(@"error: %@",error);
}

#pragma mark - MFMessageComposeViewController delegate methods

- (void)messageComposeViewController:(MFMessageComposeViewController *)controller didFinishWithResult:(MessageComposeResult)result
{
    UIAlertView *alert;
    
	switch (result) {
		case MessageComposeResultCancelled:
			NSLog(@"Cancelled");
			break;
		case MessageComposeResultFailed:
			alert = [[UIAlertView alloc] initWithTitle:@"Klaida" message:@"Žinutės išsiųsti negalima" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil];
            [alert show];
            [alert release];
			break;
		case MessageComposeResultSent:
            
			break;
		default:
			break;
	}
    
	[self dismissModalViewControllerAnimated:YES];
}


@end
