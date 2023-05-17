#!/usr/bin/perl
use strict;
use warnings;
my $c=0;
  for my $i (1..2) {
    for my $j (1..2) {
      for my $k (1..2) {
        for my $l (1..2) {
          print "&.m-", $c++,"{";
          print "background-image:url('assets/img/motif-0-$i$j$k$l.png');";
	  print "&.done{";
          print "background-image:url('assets/img/motif-1-$i$j$k$l.png');";
          print "}}\n";
        }
      }
    }
  }
