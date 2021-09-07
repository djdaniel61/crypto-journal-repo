import React, { useState, useEffect } from 'react';
import '../App.css';
import { listTags as ListTags } from '../graphql/queries';
import { deleteTag as DeleteTag } from '../graphql/mutations';
import { updateTag as UpdateTag } from '../graphql/mutations';
import { createTag as CreateTag } from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import MaterialTable from 'material-table';

const columns = [
  {
    title: 'Title',
    field: 'title'
  },
  {
    title: 'Description',
    field: 'description'
  }
];

const GetTags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function deleteTagByID(tagID, version) {
    try {
      await API.graphql(
        graphqlOperation(DeleteTag, {
          input: { id: tagID, _version: version }
        })
      );
      console.log(tagID, version);
    } catch (error) {
      console.log(error);
      console.log(tagID, version);
    }
  }

  async function updateTagByID(tagID, tagData) {
    var editedTagData = {
      id: tagID,
      title: tagData.title,
      description: tagData.description,
      _version: tagData._version
    };
    try {
      await API.graphql(graphqlOperation(UpdateTag, { input: editedTagData }));

      console.log(editedTagData);
    } catch (error) {
      console.log(error);
    }
  }

  async function getData() {
    try {
      const tagData = await API.graphql(graphqlOperation(ListTags));
      console.log('tagData:', tagData);
      const updatedTagData = tagData.data.listTags.items.filter(
        (item) => !item._deleted
      );
      setTags(updatedTagData);
      console.log('tags are:', tags);
    } catch (err) {
      console.log('error fetching tags...', err);
    }
  }

  async function createTag(tagTitle, tagDescription) {
    const tagInput = {
      title: tagTitle,
      description: tagDescription
    };

    try {
      await API.graphql(graphqlOperation(CreateTag, { input: tagInput }));
      console.log('tag created');
    } catch (err) {
      console.log('error fetching tags...', err);
    }
  }
  return (
    <MaterialTable
      title='All Tags'
      columns={columns}
      data={tags}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setTags([...tags, newData]);
              createTag(newData.title, newData.description);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...tags];
              const index = oldData.tableData.id;
              console.log(index, dataUpdate);
              dataUpdate[index] = newData;
              updateTagByID(tags[index].id, newData);
              setTags([...dataUpdate]);

              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...tags];
              const index = oldData.tableData.id;
              deleteTagByID(tags[index].id, tags[index]._version);
              dataDelete.splice(index, 1);
              setTags([...dataDelete]);

              resolve();
            }, 1000);
          })
      }}
      options={{
        search: true,
        paging: false,
        filtering: true,
        exportButton: true
      }}
    />
  );
};

export default GetTags;
