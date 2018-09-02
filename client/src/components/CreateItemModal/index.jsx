import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {
    TextField,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';
import _ from 'lodash';
import uuidv1 from 'uuid/v1';

import MenuItemApi from 'actions/api/MenuItemActions';

const styles = theme => ({
    modal: {
        top: '5rem',
        margin: 'auto',
        width: '80%',
        overflow: 'auto',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        display: 'block',
    },
    container: {
        padding: theme.spacing.unit * 2,
    },
    buttons: {
        marginTop: theme.spacing.unit,
        textAlign: 'center',
    },
});

class CreateItemModal extends React.Component {
    static propTypes = {
        item: PropTypes.object,
        onCreateMenuItem: PropTypes.func.isRequired,
        onUpdateMenuItem: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        classes: PropTypes.object.isRequired,
        open: PropTypes.bool.isRequired,
    }

    static defaultProps = {
        item: null,
    }

    constructor(props) {
        super(props);

        this.state = { ingredients: [] };
    }

    componentDidUpdate(prevProps) {
        const { item } = this.props;
        if (prevProps.item !== item) {
            if (item) {
                this.updateStateFromItem();
            } else {
                this.clearState();
            }
        }
    }

    onSubmit() {
        const {
            id,
            name,
            description,
            category,
            ingredients,
            imageUrl,
        } = this.state;
        const { onCreateMenuItem, onUpdateMenuItem, onClose } = this.props;
        const menuItem = {
            id: id ? id : uuidv1(),
            name,
            description,
            category,
            imageUrl,
            ingredients: ingredients.map((ingredient) => {
                const options = ingredient.options.replace(', ', ',');
                return {
                    name: ingredient.name,
                    options: options.split(','),
                };
            }),
        };
        const cb = () => {
            onClose();
            window.location.reload();
        };
        if (id) {
            onUpdateMenuItem(id, menuItem).then(cb);
        } else {
            onCreateMenuItem(menuItem).then(cb);
        }
    }

    clearState() {
        this.setState({
            name: '',
            description: '',
            category: '',
            ingredients: [],
            imageUrl: '',
        });
    }

    updateStateFromItem() {
        const { item } = this.props;
        const {
            _id,
            name,
            description,
            category,
            ingredients,
            imageUrl,
        } = item;

        this.setState({
            name,
            description,
            category,
            imageUrl,
            id: _id,
            ingredients: ingredients.map(ingredient => ({
                name: ingredient.name,
                options: ingredient.options.join(),
            })),
        });
    }

    handleChange(name) {
        return event => this.setState({ [name]: event.target.value });
    }

    handleIngredientChange(index, name) {
        const { ingredients } = this.state;
        const ingredient = ingredients[index];
        return (event) => {
            ingredients[index] = { ...ingredient, [name]: event.target.value };
            this.setState({ ingredients });
        };
    }

    render() {
        const { classes, open, onClose } = this.props;
        const {
            name,
            description,
            category,
            ingredients,
            imageUrl,
        } = this.state;
        return (
            <Modal open={open} className={classes.modal}>
                <Paper className={classes.container}>
                    <form>
                        <Typography variant="headline">Create new item</Typography>
                        <TextField
                          id="name"
                          label="Name"
                          className={classes.textField}
                          value={name}
                          onChange={this.handleChange('name')}
                          margin="normal"
                        />
                        <TextField
                          id="description"
                          label="Description"
                          className={classes.textField}
                          value={description}
                          onChange={this.handleChange('description')}
                          margin="normal"
                        />
                        <TextField
                          id="imageUrl"
                          label="Image Url"
                          className={classes.textField}
                          value={imageUrl}
                          onChange={this.handleChange('imageUrl')}
                          margin="normal"
                        />
                        {imageUrl && (
                            <img src={imageUrl} height="200" width="200" alt="" />
                        )}
                        <InputLabel className={classes.textField}>Category</InputLabel>
                        <Select
                          className={classes.textField}
                          value={category}
                          onChange={this.handleChange('category')}
                        >
                            <MenuItem value="main">Main</MenuItem>
                            <MenuItem value="sides">Sides</MenuItem>
                            <MenuItem value="drinks">Drinks</MenuItem>
                            <MenuItem value="desserts">Desserts</MenuItem>
                        </Select>
                        {ingredients.map((ingredient, key) => (
                            <div className={classes.textField}>
                                <TextField
                                  id={`ingredient${key}`}
                                  label={`Ingredient #${key + 1}`}
                                  value={_.get(ingredient, 'name', '')}
                                  onChange={this.handleIngredientChange(key, 'name')}
                                  margin="normal"
                                />
                                <TextField
                                  id={`ingredient${key}Options`}
                                  label="Options"
                                  value={_.get(ingredient, 'options', '')}
                                  onChange={this.handleIngredientChange(key, 'options')}
                                  helperText="Comma seperated"
                                  margin="normal"
                                />
                                <Button
                                  onClick={() => {
                                      ingredients.splice(key, 1);
                                      this.setState({ ingredients });
                                  }}
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button
                          onClick={() => {
                              ingredients.push({});
                              this.setState({ ingredients });
                          }}
                        >
                            Add ingredient
                        </Button>
                    </form>
                    <div className={classes.buttons}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                              this.onSubmit();
                          }}
                        >
                            Submit
                        </Button>
                        <Button variant="contained" color="secondary" onClick={onClose}>Cancel</Button>
                    </div>
                </Paper>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onCreateMenuItem: menuItem => dispatch(MenuItemApi.createMenuItem(menuItem)),
    onUpdateMenuItem: (id, menuItem) => dispatch(MenuItemApi.updateMenuItem(id, menuItem)),
});

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateItemModal));
