#!/usr/bin/perl
use strict;
use warnings;

for my $c (0..3) {
  my $o = 0;
  for my $i (1..5) {
    for my $j (1..5) {
      print ".Square.xy-${i}x${j}.c-$c {";
      print "background-image:url('img/case-$c-$o.png');";
      print "}\n";
      $o++;
    }
  }
}
