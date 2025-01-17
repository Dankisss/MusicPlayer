<?php
    session_start(); // Start the session

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trying stuffs</title>
    <link rel="stylesheet" href="styles.css" />
</head>
<body>

    <header id="menu">
       <span>MusicPlayer</span>

        <nav class="navbar">
            <a href="#" type="button" id="share">Search</a>
            <a href="#" id="clear">Clear</a>
            <a href="#" id="chooseFile">Choose file</a>
            <input type="file" id="importMusicFile" style="display:none;" />
            <a href="#">Lessons</a>
            <a href="../login/includes/logout.php">LogOut</a>
        </nav>

    </header>

    
    <div class="try" id="history">
        <h2 id="greeter">Hello, <?php echo $_SESSION['username']; ?>!</h2>
    </div>
    
    <main>
    <div class="wrapper">
        
        <header>
          <h2>PIANO</h2>
          <div class="column volume-slider">
            <span>Volume</span><input type="range" min="0" max="1" value="0.5" step="any">
          </div>
          <div class="column keys-checkbox">
            <span>Show Keys</span><input type="checkbox" checked>
          </div>
        </header>
        <div id="piano-1" class="piano-keys">
            <div data-note="C1" class="key white"><span>c</span></div>
            <div data-note="Db1" class="key black"><span></span></div>
            <div data-note="D1" class="key white"><span>d</span></div>
            <div data-note="Eb1" class="key black"><span></span></div>
            <div data-note="E1" class="key white"><span>e</span></div>
            <div data-note="F1" class="key white"><span>f</span></div>
            <div data-note="Gb1" class="key black"><span></span></div>
            <div data-note="G1" class="key white"><span>g</span></div>
            <div data-note="Ab1" class="key black"><span></span></div>
            <div data-note="A1" class="key white"><span>a</span></div>
            <div data-note="Bb1" class="key black"><span></span></div>
            <div data-note="B1" class="key white"><span>b</span></div>

            <div data-note="C2" class="key white"><span>c</span></div>
            <div data-note="Db2" class="key black"><span></span></div>
            <div data-note="D2" class="key white"><span>d</span></div>
            <div data-note="Eb2" class="key black"><span></span></div>
            <div data-note="E2" class="key white"><span>e</span></div>
            <div data-note="F2" class="key white"><span>f</span></div>
            <div data-note="Gb2" class="key black"><span></span></div>
            <div data-note="G2" class="key white"><span>g</span></div>
            <div data-note="Ab2" class="key black"><span></span></div>
            <div data-note="A2" class="key white"><span>a</span></div>
            <div data-note="Bb2" class="key black"><span></span></div>
            <div data-note="B2" class="key white"><span>b</span></div>
        </div>
        
        <div id="piano-2" class="piano-keys">
            <div data-note="C3" class="key white"><span>c</span></div>
            <div data-note="Db3" class="key black"><span></span></div>
            <div data-note="D3" class="key white"><span>d</span></div>
            <div data-note="Eb3" class="key black"><span></span></div>
            <div data-note="E3" class="key white"><span>e</span></div>
            <div data-note="F3" class="key white"><span>f</span></div>
            <div data-note="Gb3" class="key black"><span></span></div>
            <div data-note="G3" class="key white"><span>g</span></div>
            <div data-note="Ab3" class="key black"><span></span></div>
            <div data-note="A3" class="key white"><span>a</span></div>
            <div data-note="Bb3" class="key black"><span></span></div>
            <div data-note="B3" class="key white"><span>b</span></div>

            <div data-note="C4" class="key white"><span>c</span></div>
            <div data-note="Db4" class="key black"><span></span></div>
            <div data-note="D4" class="key white"><span>d</span></div>
            <div data-note="Eb4" class="key black"><span></span></div>
            <div data-note="E4" class="key white"><span>e</span></div>
            <div data-note="F4" class="key white"><span>f</span></div>
            <div data-note="Gb4" class="key black"><span></span></div>
            <div data-note="G4" class="key white"><span>g</span></div>
            <div data-note="Ab4" class="key black"><span></span></div>
            <div data-note="A4" class="key white"><span>a</span></div>
            <div data-note="Bb4" class="key black"><span></span></div>
            <div data-note="B4" class="key white"><span>b</span></div>
        </div>
          
        <div id="piano-3" class="piano-keys">
            <div data-note="C5" class="key white"><span>c</span></div>
            <div data-note="Db5" class="key black"><span></span></div>
            <div data-note="D5" class="key white"><span>d</span></div>
            <div data-note="Eb5" class="key black"><span></span></div>
            <div data-note="E5" class="key white"><span>e</span></div>
            <div data-note="F5" class="key white"><span>f</span></div>
            <div data-note="Gb5" class="key black"><span></span></div>
            <div data-note="G5" class="key white"><span>g</span></div>
            <div data-note="Ab5" class="key black"><span></span></div>
            <div data-note="A5" class="key white"><span>a</span></div>
            <div data-note="Bb5" class="key black"><span></span></div>
            <div data-note="B5" class="key white"><span>b</span></div>

            <div data-note="C6" class="key white"><span>c</span></div>
            <div data-note="Db6" class="key black"><span></span></div>
            <div data-note="D6" class="key white"><span>d</span></div>
            <div data-note="Eb6" class="key black"><span></span></div>
            <div data-note="E6" class="key white"><span>e</span></div>
            <div data-note="F6" class="key white"><span>f</span></div>
            <div data-note="Gb6" class="key black"><span></span></div>
            <div data-note="G6" class="key white"><span>g</span></div>
            <div data-note="Ab6" class="key black"><span></span></div>
            <div data-note="A6" class="key white"><span>a</span></div>
            <div data-note="Bb6" class="key black"><span></span></div>
            <div data-note="B6" class="key white"><span>b</span></div>
        </div>
          
        <div id="piano-4" class="piano-keys">
            <div data-note="C7" class="key white"><span>a</span></div>
            <div data-note="Db7" class="key black"><span></span></div>
            <div data-note="D7" class="key white"><span>s</span></div>
            <div data-note="Eb7" class="key black"><span></span></div>
            <div data-note="E7" class="key white"><span>d</span></div>
            <div data-note="F7" class="key white"><span>f</span></div>
            <div data-note="Gb7" class="key black"><span></span></div>
            <div data-note="G7" class="key white"><span>g</span></div>
            <div data-note="Ab7" class="key black"><span></span></div>
            <div data-note="A7" class="key white"><span>h</span></div>
            <div data-note="Bb7" class="key black"><span></span></div>
            <div data-note="B7" class="key white"><span>j</span></div>
        </div>
        

        <footer>
            <button class="btn" id="next">Next</button>
            <button class="btn" id="prev">Previous</button>

            <button class="btn" id="preview">Preview</button>
            <button class="btn" id="export">Export current</button>
            
            <!-- <button type="button" id="share">Share</button> -->
        </footer>
    </div>
    
    <div id="history"></div>
    <script src="index.js"></script>
</main>

</body>
</html>