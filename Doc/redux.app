            |           |                             ascacou                               |       board           |   params  | selector  |             app
            |           |newGame|undo   |reset  |validMove  |invalidMove|activeCards|endGame|select |updateSquare   |updateValue|select     |toggleDrawer   |boot
------------------------------------------------------------------------------------------------------------------------------------------------------------------
reducer     |app        |   X   |       |       |           |           |           |   X   |       |               |           |           |   X           |
            |ascacou    |   X   |       |       |           |           |           |       |       |               |           |           |               |
            |board      |   X   |       |       |   X       |       X   |           |   X   |   X   |       X       |           |           |               |
            |cards      |   X   |   X   |   X   |   X       |           |       X   |       |       |               |           |           |               |
            |params     |   X   |       |       |           |           |           |       |       |               |   X       |           |               |
            |player     |   X   |   X   |       |   X       |           |           |   X   |       |               |           |           |               |
            |selector   |       |   X   |   X   |   X       |           |           |       |       |               |           |   X       |               |
------------------------------------------------------------------------------------------------------------------------------------------------------------------
middleware  |ascacou    |       |       |       |   X       |       X   |           |       |   X   |       X       |   X       |   X       |               |

