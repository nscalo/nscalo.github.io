import React from "react";
import { HOST, PORT, PROTO, IMAGES_PATH } from "../constants/constants.js";
import axios from 'axios';
import { FILENAMES } from "../constants/constants.js";
import Dashboard from "../socket/client.js"

// define the data in the Presentation Component so that we update state once

class ImagesList extends React.Component {
    static stateData = [];

    state = {
        imageState: null,
        update: false,
        url: "",
        score_test: '0.00',
        score_validation: '0.00',
        filenames: []
    }
    
    fetchData() {
        axios.get(PROTO + "://" + HOST + ":" + PORT + "/backend/images/20")
            .then(response => {
                var drifted = 0;
                for(var i = 0; i < response.data['paths'].length; i++) {
                    if (response.data.drifted[i] === 0) {
                        drifted = 0;
                    }
                    else {
                        drifted = 1;
                    }
                    ImagesList.stateData[ImagesList.stateData.length] = {
                        "image": IMAGES_PATH + response.data['paths'][i],
                        "checked": false,
                        "viewed": false,
                        "drifted": drifted,
                        "predicted": "Not yet known",
                        "path": response.data['paths'][i].replace("images/temp/", "").replace("-resized", "")
                    };
                }
                this.setState({
                    update: true
                });
                return response;
            }).catch(err => {
                console.log(err);
            });

    }

    componentWillMount() {
        this.fetchData();
    }

    componentDidMount() {
        this.setState({
            imageState: ImagesList.stateData
        });
    }

    selectCheckbox(key) {
        this.state.filenames.push(ImagesList.stateData[key]['path']);
    }

    submitImages(event) {
        var ctx = event.target;
        axios.post(PROTO + "://" + HOST + ":" + PORT + "/backend/drift/1000/10/face_aging", {
            "filenames": this.state.filenames
        })
        .then(response => {
            document.body.style.cursor = "wait";
            var results = response.data['predictions'];
            var score_test = response.data['score_test'];
            var score_validation = response.data['score_validation'];

            if (ImagesList.stateData.length > 0) {
                for (var state in ImagesList.stateData) {
                    var stateCopy = Object.create(ImagesList.stateData[state], {});
                    if (stateCopy['image'] in this.state.filenames) {
                        ImagesList.stateData[state] = {
                            "image": stateCopy['image'],
                            "checked": stateCopy['checked'],
                            "viewed": stateCopy['viewed'],
                            "drifted": stateCopy['drifted'],
                            "predicted": results[state]['y_pred_test'],
                            "path": stateCopy['path']
                        }
                    } else {
                        ImagesList.stateData[state] = {
                            "image": stateCopy['image'],
                            "checked": stateCopy['checked'],
                            "viewed": stateCopy['viewed'],
                            "drifted": stateCopy['drifted'],
                            "predicted": "Not yet known",
                            "path": stateCopy['path']
                        }
                    }
                }
                this.setState({
                    imageState: ImagesList.stateData, 
                    score_test: score_test, 
                    score_validation: score_validation
                });
                console.log(score_test, score_validation);
                document.body.style.cursor = "default";
            }
        }).catch(err => {
            console.log(err);
        });
    }

    selectAllCheckBoxes(keys) {
        for (var id in keys) {
            this.state.filenames.push(ImagesList.stateData[keys[id]]['path']);
        }
        var checkboxes = document.querySelectorAll(".checkbox_images");
        for (const checkbox of checkboxes) {
            if (checkbox.checked) {
                checkbox.checked = false;
            } else {
                checkbox.checked = true;
            }
        }
        return true;
    }

    render() {
        var imageState = this.props.imageState; // stateDict
        var images = null, keys = [];
        for(var key in imageState) {
            ImagesList.stateData[key] = imageState[key];
        }
        if(this.state.imageState) {
            images = this.state.imageState.map((value, key) => {
                var inputKey = "checkbox" + "[" + key.toString() + "]";
                keys.push(key);
                return (
                    <div className="image-box image-grid-item" key={key}>
                        <div className="image-tile">
                            <img src={value['image']} alt="" />
                        </div>
                        <div className="image-tile">
                            {value['path']}
                        </div>
                        <div className="image-checkbox">
                            <input type="checkbox" className="checkbox_images" name={inputKey} onChange={() => this.selectCheckbox(key)} />
                        </div>
                        <div className="image-caption">
                            <em>Drifted: {value['drifted']}, Prediction: {value['predicted']}</em>
                        </div>
                    </div>
                );
            });
        }
        return (
            <div className="clearfix">
                <div className="row">
                    <h1 className="heading">PREDICTING FACE IMAGE GRID FOR DRIFT</h1>
                </div>
                <div className="row">
                    <label>Select All <input type="checkbox" name="Select_all" value="1" onClick={() => this.selectAllCheckBoxes(keys)} /></label>
                </div>
                <div className="row">
                    <button onClick={(event) => this.submitImages(event)}>Submit Image(s)</button>
                </div>
                <div className="row image-grid">
                    { images }
                </div>
                <div className="row">
                    Score Test (Accuracy): <em className="text-color-red">{ this.state.score_test }</em>
                </div>
                <div className="row">
                    Score Validation (Accuracy): <em className="text-color-blue">{ this.state.score_validation }</em>
                </div>
                <div className="row">
                    <button onClick={(event) => this.submitImages(event)}>Submit Image(s)</button>
                </div>
            </div>
        );
    }
}

export {
    ImagesList
};