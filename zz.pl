#!/usr/bin/perl
use strict;
use warnings;
my $count = 0;
for my $c1 (qw/x 0/) {
  for my $c2 (qw/x 1/) {
    for my $c3 (qw/x 2/) {
      for my $c4 (qw/x 3/) {
        for my $c5 (qw/x 4/) {
          for my $c6 (qw/x 5/) {
            for my $c7 (qw/x 6/) {
              for my $c8 (qw/x 7/) {
                for my $c9 (qw/x 8/) {
                  for my $c10(qw/x 9/) {
                    for my $c11(qw/x a/) {
                      for my $c12(qw/x b/) {
                        for my $c13(qw/x c/) {
                          for my $c14(qw/x d/) {
                            for my $c15(qw/x e/) {
                              for my $c16(qw/x f/) {
                                my $d = "$c1$c2$c3$c4$c5$c6$c7$c8$c9$c10$c11$c12$c13$c14$c15$c16";
                                next if 8 !=  ($d =~ tr/x//);
                                $d =~ s/x//g;
                                print $count++,"\t",$d,"\n";
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
