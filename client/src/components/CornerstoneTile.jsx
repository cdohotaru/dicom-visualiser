import React from "react";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import * as cornerstoneWebImageLoader from "cornerstone-web-image-loader";
import * as cornerstoneWadoImageLoader from "cornerstone-wado-image-loader";
import * as dicomParser from "dicom-parser";

import * as utils from "../utils/utils";

cornerstoneWadoImageLoader.external.cornerstone = cornerstone;
cornerstoneWadoImageLoader.external.dicomParser = dicomParser

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWebImageLoader.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;

const config = {
  maxWebWorkers: navigator.hardwareConcurrency || 1,
  startWebWorkersOnDemand: true,
  taskConfiguration: {
    decodeTask: {
      initializeCodecsOnStartup: false,
      usePDFJS: false
    }
  }
};

// maxWebWorkers: navigator.hardwareConcurrency || 1,
//   startWebWorkersOnDemand: true,
//   webWorkerTaskPaths: [webWorkerTaskPath],
//   taskConfiguration: {
//     decodeTask: {
//       initializeCodecsOnStartup: false,
//       usePDFJS: false
//     }
//   }

cornerstoneWadoImageLoader.webWorkerManager.initialize(config);


const divStyle = {
  width: "200px",
  height: "200px",
  position: "relative",
  color: "white"
};

const bottomLeftStyle = {
  bottom: "5px",
  left: "5px",
  position: "absolute",
  color: "white"
};

const bottomRightStyle = {
  bottom: "5px",
  right: "5px",
  position: "absolute",
  color: "white"
};

export default class CornerstoneTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // stack: props.stack,
      viewport: cornerstone.getDefaultViewport(null, undefined),
      // imageId: props.stack.imageIds[0],
      imageUri: utils.createImageUri(props.imageId)
    };
  }

  componentDidMount() {
    const element = this.element;

    // Enable the DOM Element for use with Cornerstone
    cornerstone.enable(element);

    try {

      cornerstone.loadAndCacheImage(this.state.imageUri, { usePDFJS: false }).then(image => {
        cornerstone.displayImage(element, image);

        // Enable our tools
        cornerstoneTools.mouseInput.enable(element);
        cornerstoneTools.mouseWheelInput.enable(element);
        cornerstoneTools.wwwc.activate(element, 1); // Left Click
        cornerstoneTools.pan.activate(element, 2); // Middle Click
        cornerstoneTools.zoom.activate(element, 4); // Right Click
        cornerstoneTools.zoomWheel.activate(element); // Mouse Wheel


        // Load the first image in the stack
        // cornerstone.loadImage(this.state.imageId).then(image => {
        //   // Display the first image
        //   cornerstone.displayImage(element, image);

        //   // Add the stack tool state to the enabled element
        //   const stack = this.props.stack;
        //   cornerstoneTools.addStackStateManager(element, ["stack"]);
        //   cornerstoneTools.addToolState(element, "stack", stack);

        //   cornerstoneTools.mouseInput.enable(element);
        //   cornerstoneTools.mouseWheelInput.enable(element);
        //   cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
        //   cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
        //   cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
        //   cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel

        //   cornerstoneTools.touchInput.enable(element);
        //   cornerstoneTools.panTouchDrag.activate(element);
        //   cornerstoneTools.zoomTouchPinch.activate(element);

        element.addEventListener(
          "cornerstoneimagerendered",
          this.onImageRendered
        );
        element.addEventListener("cornerstonenewimage", this.onNewImage);
        window.addEventListener("resize", this.onWindowResize);
      }, error => {
        console.log("Error when 1oading the image: ", error);
      });
    } catch (error) {
      console.log("Error:", error);
    }
  }

  componentWillUnmount() {
    const element = this.element;
    element.removeEventListener(
      "cornerstoneimagerendered",
      this.onImageRendered
    );

    element.removeEventListener("cornerstonenewimage", this.onNewImage);

    window.removeEventListener("resize", this.onWindowResize);

    cornerstone.disable(element);
  }

  // componentDidUpdate(prevProps, prevState) {
  // const stackData = cornerstoneTools.getToolState(this.element, "stack");
  // const stack = stackData && stackData.data[0] ? stackData.data[0] : {};
  // stack.currentImageIdIndex = this.state.stack.currentImageIdIndex;
  // stack.imageIds = this.state.stack.imageIds;
  // cornerstoneTools.addToolState(this.element, "stack", stack);

  // const imageId = stack.imageIds[stack.currentImageIdIndex];
  // cornerstoneTools.scrollToIndex(this.element, stack.currentImageIdIndex);
  // }

  onWindowResize = () => {
    cornerstone.resize(this.element);
  }

  onImageRendered = () => {
    const viewport = cornerstone.getViewport(this.element);

    this.setState({
      viewport
    });
  }

  onNewImage = () => {
    const enabledElement = cornerstone.getEnabledElement(this.element);

    this.setState({
      imageId: enabledElement.image.imageId
    });
  }

  onClickHandler = (event) => {
    console.log(event, event.currentTarget.dataset.id);
    if (this.props.onClickHandler) {
      this.props.onClickHandler(event.currentTarget.dataset.id);
    }
  }

  render() {
    return (
      <div
        onClick={this.onClickHandler}
        data-id={this.props.imageId}>
        <div
          className="viewportElement"
          style={divStyle}
          ref={input => {
            this.element = input;
          }}
        >
          <canvas className="cornerstone-canvas" />
          <div style={bottomLeftStyle}>Zoom: {this.state.viewport.scale}</div>
          <div style={bottomRightStyle}>
            WW/WC: {this.state.viewport.voi.windowWidth} /{" "}
            {this.state.viewport.voi.windowCenter}
          </div>
        </div>
      </div>
    );
  }
}