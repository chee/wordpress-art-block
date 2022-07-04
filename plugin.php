<?php
/**
 * Plugin Name: Art Block
 * Plugin URI: https://github.com/chee/art-block
 * Description: Art Block is a gutenberg block for art posts
 * Author: chee rabbits
 * Author URI: https://chee.baby
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
