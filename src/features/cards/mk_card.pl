#!/usr/bin/perl
use strict;
use warnings;

for my $c (0..1) {
  for my $i (1..2) {
    for my $j (1..2) {
      for my $k (1..2) {
        for my $l (1..2) {
          print ".Card.m-$i$j$k$l". ($c ? ".done" :"" )." {";
          print "background-image:url('assets/img/motif-$c-$i$j$k$l.png');";
          print "}\n";
        }
      }
    }
  }
}
