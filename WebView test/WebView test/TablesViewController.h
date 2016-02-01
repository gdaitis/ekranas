//
//  TablesViewController.h
//  WebView test
//
//  Created by Vytautas on 6/15/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "GenericViewController.h"

@interface TablesViewController : GenericViewController 
{
    UILabel *titleLabel;
    BOOL which;
}

@property (nonatomic, retain) UILabel *titleLabel;
@property BOOL which;

- (IBAction)switchTables;

@end
