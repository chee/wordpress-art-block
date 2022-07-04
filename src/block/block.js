/**
 * BLOCK: art-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./editor.scss";
import "./style.scss";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

const { Disabled, SandBox, SVG, Path, TextControl, PanelBody } = wp.components;
const { BlockControls, InspectorControls } = wp.editor;
const { withState } = wp.compose;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

function html(code) {
	return `
	<script src="${window._abu}"></script>
	<script>${code}</script>
	`;
}

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("chee/art-block", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Art"), // Block title.
	icon: (
		<svg width="24" height="24" aria-hidden="true" focusable="false">
			<text x="4" y="17" fill="#336699">
				art
			</text>
		</svg>
	),
	category: "art", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("art"), __("p5")],
	attributes: {
		code: {
			type: "string",
			default: "",
		},
		height: {
			type: "number",
			default: 440,
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: withState({
		isPreview: false,
	})(({ isPreview, setState, attributes, setAttributes }) => {
		return (
			<div className="wp-block-art-block">
				<InspectorControls>
					<PanelBody title={__("Settings")}>
						<TextControl
							label="Height"
							onChange={(height) => setAttributes({ height })}
							value={attributes.height}
						/>
					</PanelBody>
				</InspectorControls>
				<BlockControls>
					<div className="components-toolbar">
						<button
							className={`components-button components-toolbar-button components-tab-button ${
								isPreview ? "" : "is-pressed"
							}`}
							onClick={() => setState({ isPreview: false })}
						>
							<span>{__("Editor")}</span>
						</button>
						<button
							className={`components-button components-toolbar-button components-tab-button ${
								isPreview ? "is-pressed" : ""
							}`}
							onClick={() => setState({ isPreview: true })}
						>
							<span>{__("Preview")}</span>
						</button>
					</div>
				</BlockControls>
				<Disabled.Consumer>
					{(isDisabled) =>
						isPreview || isDisabled ? (
							<iframe
								height={attributes.height || 440}
								srcDoc={`${html(attributes.code)}`}
							/>
						) : (
							<Editor
								value={attributes.code || ""}
								onValueChange={(code) =>
									setAttributes({ code })
								}
								highlight={(code) =>
									highlight(code, languages.js)
								}
								padding={10}
								style={{
									fontFamily: "monospace",
									fontSize: 16,
								}}
							/>
						)
					}
				</Disabled.Consumer>
			</div>
		);
	}),

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ({ attributes }) => {
		return null;
	},
});
