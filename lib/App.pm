package App;
use Mojo::Base 'Mojolicious';
use Mojo::File;

# This method will run once at server start
sub startup {
  my $self = shift;

  # Load configuration from hash returned by config file
  my $config = $self->plugin('Config');
  $self->static->paths([$self->app->home.'/dist']); # sans public
  #push @{$self->static->paths} , $self->app->home.'/dist'; # avec public
  #
  #spécifie plusieurs sources
  my @watch;
  if (open BUILD, "src/build") {
    while(<BUILD>) {
      chomp;
      push @watch, -d "src/$_"
      ? map {$_->to_abs} Mojo::File->new("src/$_")->list_tree->each
      : "src/$_";
    }
  }
  my $parcel = $self->plugin('Parcel', watch=>[@watch?(@watch):'src/index.html']);

  # Configure the application
  $self->secrets($config->{secrets});

  # Router
  my $r = $self->routes;

  # Normal route to controller
  $r->options('/*' => sub{shift->render(data=>'')});
  $r->get('/' => sub{shift->reply->static('index.html')});

  $self->hook(after_dispatch => sub {
      my $c = shift;
      $c->res->headers->header('Access-Control-Allow-Origin' => '*');
      $c->res->headers->header('Access-Control-Allow-Headers' => 'Content-Type');
      #     $c->res->headers->header('Access-Control-Allow-Credentials' => 'true');
      #     $c->res->headers->header('Access-Control-Allow-Methods' => '*');
    }
  );

}

1;
