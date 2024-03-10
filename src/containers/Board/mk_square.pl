#!/usr/bin/perl
use strict;
use warnings;

my $o = 0;
for my $i (1..5) {
  for my $j (1..5) {
    print "&.xy-${i}x${j} {";
    for my $c (0..3, '1x', '2x') {
      print "&.c-$c {";
      print "background-image:url('/img/case-$c-$o.png');";
      print "}";
    }
    $o++;
    print "}\n";
  }
}
