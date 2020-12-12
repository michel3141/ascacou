package Mojolicious::Plugin::Parcel;
use Mojo::Base 'Mojolicious::Plugin';
use IPC::System::Simple qw(system $EXITVAL);

our $VERSION = '0.01';

sub register {
  my ($self, $app, $prms) = @_;
  return if $app->mode ne 'development';

  system ([0,1],'ps aux |grep "[n]ode.*parcel"');
  return unless $EXITVAL;
  fork or exec $app->home.'/node_modules/.bin/parcel', watch => '--public-url' => './', ref($prms->{watch}) ? @{$prms->{watch}} : $prms->{watch};
  
  return $self;
}

1;
__END__

=encoding utf8

=head1 NAME

Mojolicious::Plugin::Parcel - Mojolicious Plugin

=head1 SYNOPSIS

  # Mojolicious
  $self->plugin('Parcel');

  # Mojolicious::Lite
  plugin 'Parcel';

=head1 DESCRIPTION

L<Mojolicious::Plugin::Parcel> is a L<Mojolicious> plugin.

=head1 METHODS

L<Mojolicious::Plugin::Parcel> inherits all methods from
L<Mojolicious::Plugin> and implements the following new ones.

=head2 register

  $plugin->register(Mojolicious->new);

Register plugin in L<Mojolicious> application.

=head1 SEE ALSO

L<Mojolicious>, L<Mojolicious::Guides>, L<http://mojolicious.org>.

=cut
