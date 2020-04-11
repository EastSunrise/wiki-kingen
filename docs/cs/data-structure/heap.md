#### Overview

A Binary Heap is a Complete Binary Tree where items are stored in a special order such that value in a parent node is greater(or smaller) than the values in its two children nodes. The former is called as max heap and the latter is called min heap.

The heap can be represented by array. If the parent node is stored at index $i$, the left child can be calculated by $2i+1$ and right child by $2i+2$ (assuming the indexing starts at 0).

##### Implementation

```java
// Data structure of Heap
public class Heap<V extends Comparable<? super V>> {
	V[] array;
	int heapSize;// [0, array.length]

	Heap(V[] array) {
		this.array = array;
		heapSize = array.length;
		buildHeap();
	}

	// build a max heap
	void buildHeap() {
		for (int i = array.length / 2 - 1; i >= 0; i--) {
			heapify(i);
		}
	}

	void heapify(int i){
		while (true) {
			int l = left(i), r = right(i), largest = i;
			if (l < heapSize && array[l].compareTo(array[largest]) > 0) {
				largest = l;
			}

			if (r < heapSize && array[r].compareTo(array[largest]) > 0) {
				largest = r;
			}

			if (largest != i) {
				swap(array, i, largest);
			} else {
				break;
			}
		}
	}

	/* common operations */

	void insert(V key) {
		if (heapSize == array.length) {
			throw new ArrayIndexOutOfBoundsException();
		}

		heapSize++;
		updateKey(heapSize - 1, key);
	}

	void delete(int i) {
		if (isEmpty() || i < 0 || i >= heapSize) {
			throw new ArrayIndexOutOfBoundsException();
		}

		updateKey(i, array[heapSize - 1]);
		heapSize--;
	}

	void updateKey(int i, V key) {
		if (i >= heapSize) {
			throw new IndexOutOfBoundsException();
		}

		array[i] = key;
		heapify(i);
		while (i > 0 && array[parent(i)].compareTo(array[i]) < 0) {
			swap(array, i, parent(i));
			i = parent(i);
		}
	}

	V getHead() {
		return isEmpty() ? null : array[0];
	}

	V extractHead() {
		if (isEmpty()) {
			return null;
		}

		V max = getHead();
		array[0] = array[heapSize-- - 1];
		heapify(0);
		return max;
	}


	/* Basic methods */

	// Get index of parent node
	int parent(int i) {
		return (i - 1) >> 1;
	}

	// Get index of left child node
	int left(int i) {
		return (i << 1) + 1;
	}

	// Get index of right child node
	int right(int i) {
		return (i + 1) << 1;
	}

	int size() {
		return heapSize;
	}

	boolean isEmpty() {
		return heapSize == 0;
	}
}
```
